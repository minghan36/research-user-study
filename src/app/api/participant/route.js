import { initializeDatabase } from "../../../../lib/init-db";


export async function POST(request) {
    try {
        const db = initializeDatabase();
        const body = await request.json();
        const { groupNumber } = body;

        // Generate a simple participant ID
        const participantId = `participant_${crypto.randomUUID()}`;

        db.prepare(
            `INSERT INTO participants (participant_id, group_number) VALUES (?, ?)`
        ).run(participantId, groupNumber);

        return new Response(JSON.stringify({ participantId: participantId }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error creating participant:", error);
        return new Response(JSON.stringify({ error: "Failed to create participant" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }   
}

export async function DELETE(request) {
    try {
        const db = initializeDatabase();
        const body = await request.json();
        const { participantId } = body;
        db.prepare("DELETE FROM participants WHERE participant_id = ?").run(participantId);
        return new Response(JSON.stringify({ message: "Participant deleted" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error deleting participant:", error);
        return new Response(JSON.stringify({ error: "Failed to delete participant" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}