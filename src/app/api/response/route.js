import { initializeDatabase } from "../../../../lib/init-db";

export async function POST(request) {
    try {
        const db = initializeDatabase();
        const responses = await request.json();
        const responseIds = [];

        // Prepare the insert statement
        const insertStmt = db.prepare(
            `INSERT INTO responses (block, colour, is_word, is_correct, response_time, participant_id) VALUES (?, ?, ?, ?, ?, ?)`
        );

        // Use a transaction for better performance with multiple inserts
        const insertMany = db.transaction((responsesToInsert) => {
            for (const response of responsesToInsert) {
                const { block, colour, isWord, isCorrect, responseTime, participantId } = response;
                // Convert booleans to integers for SQLite compatibility
                const isWordInt = isWord ? 1 : 0;
                const isCorrectInt = isCorrect ? 1 : 0;
                const result = insertStmt.run(block, colour, isWordInt, isCorrectInt, responseTime, participantId);
                responseIds.push(result.lastInsertRowid);
            }
        });

        // Execute the transaction
        insertMany(responses);

        return new Response(JSON.stringify({ 
            responseIds: responseIds, 
            count: responseIds.length 
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error creating response(s):", error);
        return new Response(JSON.stringify({ error: "Failed to create responses" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }   
}