import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailPayload {
    to: string;
    type: "registration" | "approval";
    athleteName: string;
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { to, type, athleteName }: EmailPayload = await req.json();

        let subject = "";
        let html = "";

        if (type === "registration") {
            subject = "Inscrição Recebida - Copa Pé Vermelho 2026";
            html = `
        <h1>Olá, ${athleteName}!</h1>
        <p>Recebemos sua inscrição para a Copa Pé Vermelho 2026.</p>
        <p>Estamos muito felizes com seu interesse! Assim que seu pagamento for confirmado por nossa equipe, você receberá um novo e-mail de confirmação.</p>
        <p>Até breve!</p>
        <br/>
        <p><strong>Equipe Pé Vermelho Rugby</strong></p>
      `;
        } else if (type === "approval") {
            subject = "Inscrição Aprovada! - Copa Pé Vermelho 2026";
            html = `
        <h1>Parabéns, ${athleteName}!</h1>
        <p>Sua inscrição para a Copa Pé Vermelho 2026 foi <strong>confirmada</strong>!</p>
        <p>Agora é oficial. Esperamos você no dia 07 de março de 2026 para um dia de muito rugby e integração.</p>
        <p>Prepare suas chuteiras!</p>
        <br/>
        <p><strong>Equipe Pé Vermelho Rugby</strong></p>
      `;
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Copa Pé Vermelho <onboarding@resend.dev>", // TODO: Change to verified sender
                to: [to],
                subject: subject,
                html: html,
            }),
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
