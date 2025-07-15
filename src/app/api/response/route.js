import { initializeDatabase } from "../../../../lib/init-db";

export async function POST(request) {
    try {
        const db = initializeDatabase;
        const body = await request.json();
        const { block, colour, isWord, isCorrect, responseTime, participantId } = body;

        const responseId = db.prepare(
            `INSERT INTO responses (block, colour, is_word, is_correct, response_time, participant_id) VALUES (?, ?, ?, ?, ?, ?)`
        ).run(block, colour, isWord, isCorrect, responseTime, participantId).lastInsertRowid;

        return new Response(JSON.stringify({ responseId: responseId }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error creating response:", error);
        return new Response(JSON.stringify({ error: "Failed to create response" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }   
}