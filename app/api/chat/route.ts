import { NextRequest, NextResponse } from "next/server";
import { generateAIText, getActiveProvider } from "@/lib/ai/client";

interface ChatMessagePayload {
  sender: "user" | "sahayya";
  text: string;
}

interface ChatRequestBody {
  message: string;
  conversationHistory?: ChatMessagePayload[];
  userContext?: {
    name?: string;
    enterprise?: string;
    sector?: string;
    location?: string;
  };
}

const SYSTEM_PROMPT = `You are the Sahayya Assistant, an AI helper inside Sahayya — a digital growth and compliance platform for rural MSMEs (Micro, Small & Medium Enterprises) in India. You can discuss ANYTHING the user brings up — greetings, general business questions, questions about compliance (GST, Udyam registration), government schemes, workplace safety practices, product quality control, credit/loan readiness, patents & IP, demand planning, workshop electricity cost reduction, raw material sourcing, local marketing, or anything else related to running a small business in India. You are not limited to a fixed script — answer naturally and conversationally, the way a knowledgeable, friendly advisor would.

When it's genuinely useful, you may suggest the user try one of Sahayya's structured tools (Safety Check, Demand Forecast, Credit Readiness, Quality Check, Patent Roadmap) by name — but only as a natural suggestion, never a forced redirect, and always still answer their actual question first in your own words.

If asked something outside your knowledge or requiring real-time/legal-specific accuracy (e.g. exact current scheme eligibility criteria, legal patent advice, medical advice), be honest about the limits of a Free Trial AI assistant and suggest professional or official verification where appropriate. Keep responses concise, practical, and encouraging — this is a small business owner, often in a rural area, who needs clear and simple guidance, not jargon.`;

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestBody = await req.json();
    const { message, conversationHistory = [], userContext } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long. Please limit your message to 2000 characters." },
        { status: 400 }
      );
    }

    // Format user context
    let contextStr = "";
    if (userContext) {
      contextStr = `\nUSER CONTEXT:\n- User Name: ${userContext.name || "MSME Owner"}\n- Enterprise: ${userContext.enterprise || "Rural Enterprise"}\n- Sector: ${userContext.sector || "Manufacturing / Agro"}\n- Location: ${userContext.location || "India"}\n`;
    }

    // Build multi-turn context (trimmed to last 10 messages)
    const recentHistory = conversationHistory.slice(-10);
    const formattedHistory = recentHistory
      .map((m) => `${m.sender === "user" ? "User" : "Sahayya Assistant"}: ${m.text}`)
      .join("\n");

    const prompt = `${contextStr}
CONVERSATION HISTORY:
${formattedHistory ? formattedHistory : "(No prior messages in session)"}

CURRENT USER QUERY:
User: ${message}

SAHAYYA ASSISTANT: Provide a direct, helpful, natural, and well-grounded response.`;

    const activeProvider = getActiveProvider();
    console.log(`\n========================================`);
    console.log(`[API /api/chat] Incoming request received for message: "${message}"`);
    console.log(`[API /api/chat] Active LLM Provider: ${activeProvider || "NONE (Key Missing)"}`);
    console.log(`[API /api/chat] Full prompt being dispatched to LLM:\n${prompt}`);
    console.log(`========================================\n`);

    try {
      const reply = await generateAIText(prompt, {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxTokens: 800,
      });

      console.log(`\n========================================`);
      console.log(`[API /api/chat] LLM successfully responded:`);
      console.log(`Reply:\n${reply}`);
      console.log(`========================================\n`);

      // Extract optional suggested action pills if relevant
      const suggestedActions: string[] = [];
      const lower = reply.toLowerCase();
      if (lower.includes("safety check") || lower.includes("safety audit") || lower.includes("press brake") || lower.includes("ppe")) {
        suggestedActions.push("👷 Run AI Safety Check");
      }
      if (lower.includes("demand forecast") || lower.includes("sales trend") || lower.includes("predict") || lower.includes("season")) {
        suggestedActions.push("📈 Run Demand Forecast");
      }
      if (lower.includes("credit readiness") || lower.includes("loan") || lower.includes("cgtmse") || lower.includes("mudra") || lower.includes("pmegp")) {
        suggestedActions.push("💳 Check Credit Readiness");
      }
      if (lower.includes("patent") || lower.includes("intellectual property") || lower.includes("gi tag") || lower.includes("design")) {
        suggestedActions.push("💡 View Patent Roadmap");
      }
      if (lower.includes("quality check") || lower.includes("zed") || lower.includes("defect") || lower.includes("inspection")) {
        suggestedActions.push("🔬 Run Quality Inspection");
      }
      if (lower.includes("compliance") || lower.includes("gst") || lower.includes("udyam") || lower.includes("license")) {
        suggestedActions.push("🛡️ Audit Compliance");
      }

      return NextResponse.json({
        reply: reply.trim(),
        suggestedActions: suggestedActions.slice(0, 3),
      });
    } catch (aiError) {
      console.warn(`[API /api/chat] LLM call failed or no API key configured. Cause:`, aiError);

      const fallbackReply = generateConversationalFallback(message, userContext);
      console.log(`[API /api/chat] Serving fallback response for "${message}":\n${fallbackReply}`);

      const suggestedActions: string[] = [];
      const lower = message.toLowerCase();
      if (lower.includes("safe") || lower.includes("hazard") || lower.includes("press") || lower.includes("machine") || lower.includes("ppe")) {
        suggestedActions.push("👷 Run AI Safety Check");
      }
      if (lower.includes("demand") || lower.includes("sale") || lower.includes("season") || lower.includes("monsoon") || lower.includes("forecast")) {
        suggestedActions.push("📈 Run Demand Forecast");
      }
      if (lower.includes("loan") || lower.includes("credit") || lower.includes("finance") || lower.includes("pmegp") || lower.includes("mudra")) {
        suggestedActions.push("💳 Check Credit Readiness");
      }
      if (suggestedActions.length === 0) {
        suggestedActions.push("🛡️ Audit Compliance", "🏛️ Government Schemes", "👷 AI Safety Check");
      }

      return NextResponse.json({
        reply: fallbackReply,
        suggestedActions: suggestedActions.slice(0, 3),
      });
    }
  } catch (error) {
    console.error("[API /api/chat] Route Error:", error);
    return NextResponse.json(
      { error: "Sorry, I couldn't process that right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}

function generateConversationalFallback(
  input: string,
  userContext?: { name?: string; enterprise?: string; sector?: string }
): string {
  const query = input.toLowerCase().trim();
  const userName = userContext?.name || "there";
  const businessName = userContext?.enterprise || "your business";

  if (query.match(/^(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/)) {
    return `Namaste ${userName}! 🙏 I'm your Sahayya Assistant. I'm here to help ${businessName} stay compliant, discover government subsidies (PMEGP, Mudra), run workshop safety audits, forecast production demand, and scale your operations. What would you like to discuss today?`;
  }

  if (query.includes("france") || query.includes("capital")) {
    return `The capital of France is Paris. If you're exploring export opportunities to the European Union for Indian manufactured goods, you will need CE marking compliance and an active Import Export Code (IEC) linked to your GST portal.`;
  }

  if (query.includes("fact") || query.includes("random")) {
    return `Here's an inspiring fact: India is home to over 63 million MSMEs, which contribute approximately 30% to the country's GDP and account for nearly 45% of total national manufacturing exports! Micro-enterprises form the backbone of rural employment.`;
  }

  if (query.includes("monsoon") || query.includes("cash flow") || query.includes("seasonal")) {
    return `To manage cash flow during seasonal dips or the monsoon season for ${businessName}:\n\n1. **Pre-Book Advance Off-Season Maintenance & Overhauls**: Use the slowdown to repair mechanical tooling, calibrate dies, and conduct electrical audits.\n2. **Avail CGTMSE / Mudra Working Capital Overdraft (OD)**: Set up a formal bank cash-credit (CC) line to bridge payroll and utility costs during dry months.\n3. **Diversify into Non-Seasonal Fabrication**: Supplement agro-tools with year-round utility items (e.g. residential MS railings, solar panel mounting brackets, or storage sheds).\n4. **Negotiate Extended Supplier Credit Terms**: Shift raw steel sheet purchases to 45–60 day credit terms backed by MSME Samadhaan protection.`;
  }

  if (query.includes("press brake") || query.includes("safety") || query.includes("machine") || query.includes("press")) {
    return `For operating heavy mechanical press brakes (5-ton to 50-ton) safely:\n\n1. **Two-Hand Control & Light Curtains**: Ensure the operator must depress dual simultaneous pushbuttons to actuate the stroke, keeping hands clear of the pinch point.\n2. **Die Alignment & Hold-Down Inspection**: Check tooling bolts and clearance before applying hydraulic or flywheel pressure.\n3. **Mandatory PPE**: Steel-toe antistatic boots (IS 15298) and cut-resistant Kevlar gloves when handling sheared sheet metal edges.\n4. **Emergency Stop (E-Stop) Check**: Verify the foot-pedal dead-man switch and red mushroom stop trips instantly before starting a shift.`;
  }

  if (query.includes("pmegp") && query.includes("mudra")) {
    return `Regarding applying for both PMEGP and Mudra loans:\n\n• **For the Same Project/Asset**: You **cannot** claim both PMEGP subsidy and Mudra on the same exact machine or setup, as central rules prohibit double-subsidization of identical capital expenditure.\n• **Sequential / Expansion Staging**: You **can** start with a Mudra loan (Shishu or Kishor tier) to build your track record, and later apply for a PMEGP project grant (up to ₹50 Lakhs with 25-35% capital subsidy) for establishing a new or expanded rural unit!`;
  }

  if (query.includes("electricity") || query.includes("power") || query.includes("energy")) {
    return `To effectively reduce electricity costs in a small manufacturing workshop:\n\n1. **Shift Heavy Operations to Off-Peak Hours**: Utilize Time-of-Day (ToD) tariff concessions offered by state electricity boards during night/early morning hours.\n2. **Install Power Factor Correction Capacitors**: Maintain a power factor above 0.95 to avoid low power factor penalty surcharges.\n3. **Avail PM Surya Ghar Rooftop Solar Subsidy**: MSMEs can claim up to 40% capital grants on installing industrial rooftop solar panels to offset up to 60% of recurring grid power costs.\n4. **Upgrade to IE3 Energy-Efficient Induction Motors**: Reduces baseline machinery power consumption by 10-15%.`;
  }

  if (query.includes("what is sahayya") || query.includes("about sahayya") || query.includes("platform")) {
    return `🌱 **Sahayya** is a dedicated digital growth and compliance platform built specifically for rural MSMEs and industrial clusters across India.\n\nWe provide:\n• **Statutory Compliance Tracking** (GST returns, Udyam Aadhaar, Factory licenses, EPFO)\n• **Government Scheme Matching** (PMEGP 35% capital subsidy, PMFME, CGTMSE collateral-free loans)\n• **AI Workplace Safety Audits** (Machine guards, PPE, floor hazard demarcation)\n• **Production Demand Forecasting** (Trend-based batch projections)\n• **Product Quality & ZED Certification Support**`;
  }

  return `Regarding "${input}": For small enterprises, practical steps like formalizing daily digital billing, monitoring raw material buffers, and maintaining compliance across GST and Udyam create strong foundations for bank financing and government subsidies. How can I assist ${businessName} specifically with this?`;
}
