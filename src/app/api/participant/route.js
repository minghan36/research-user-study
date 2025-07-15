import { initializeDatabase } from "../../../../lib/init-db";


export async function POST(request) {
    try {
        const db = initializeDatabase();
        const body = await request.json();
        const { group } = body;

        const participantId = db.prepare(
            `INSERT INTO participants (group) VALUES (?)`
        ).run(group).lastInsertRowid;

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
        return new Response(JSON.stringify({ error: "Failed to delete participant" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}