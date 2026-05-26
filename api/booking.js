// Asynchronous Cockpit Serverless API Booking Transporter (Vercel Serverless Function)
export default async function handler(req, res) {
    // 1. Enforce strict POST request channel
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 
            success: false, 
            error: "Method Not Allowed // Transmit via POST only." 
        });
    }

    try {
        const { pilotName, pilotEmail, collaborationPack, pilotMessage } = req.body;

        // 2. Strict Telemetry Validation
        if (!pilotName || !pilotEmail || !pilotMessage) {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid Telemetry payload // Pilot credentials incomplete." 
            });
        }

        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(pilotEmail)) {
            return res.status(400).json({ 
                success: false, 
                error: "Corrupt Pilot Email vector // Format rejected." 
            });
        }

        // 3. Sanitizing and Logging payload
        const sanitizedPayload = {
            pilot: pilotName.trim(),
            email: pilotEmail.trim(),
            package: (collaborationPack || "General Inquiry").trim(),
            message: pilotMessage.trim(),
            timestamp: new Date().toISOString()
        };

        console.log("ENGINE TRANSMISSION LOCKED: ", sanitizedPayload);

        // NOTE: Abhyudaya can easily extend this hook to route directly to Resend, SendGrid, or AWS SES:
        /*
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: 'cockpit@abhyudaya.dev',
            to: 'abhyudayasinha04@gmail.com',
            subject: `Mission Booking: ${sanitizedPayload.package}`,
            html: `<h3>New Flight Mission Locked!</h3>...`
        });
        */

        // 4. Return pristine locked telemetry confirmation
        return res.status(200).json({
            success: true,
            message: "TELEMETRY SYNAPSE LOCKED // MISSION FLIGHT SECURED 🏎️💨",
            timestamp: sanitizedPayload.timestamp
        });

    } catch (error) {
        console.error("TRANSMISSION ERROR: ", error);
        return res.status(500).json({ 
            success: false, 
            error: "Telemetry transmission crash // Serverless circuit failed." 
        });
    }
}
