import ShortUniqueId from "short-unique-id";
import { initializeDatabase } from "../../../../lib/init-db";


export async function POST(request) {
    try {
        const db = initializeDatabase();
        const body = await request.json();
        const { groupNumber } = body;
        const uid = new ShortUniqueId({ length: 10 });
        // Generate a simple participant ID
        const participantId = `participant_${uid.rnd()}`;

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

export async function PATCH(request) {
    try {
        const db = initializeDatabase();
        const body = await request.json();
        const { participantId, ...updates } = body;

        if (!participantId) {
            return new Response(JSON.stringify({ error: "Participant ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Build dynamic update query based on provided fields
        const updateFields = [];
        const values = [];

        if (updates.groupNumber !== undefined) {
            updateFields.push("group_number = ?");
            values.push(updates.groupNumber);
        }

        if (updates.complete !== undefined) {
            updateFields.push("complete = ?");
            values.push(updates.complete ? 1 : 0);
        }

        if (updates.startBlockOne !== undefined) {
            updateFields.push("block_one_start = ?");
            values.push(updates.startBlockOne);
        }

        if (updates.startBlockTwo !== undefined) {
            updateFields.push("block_two_start = ?");
            values.push(updates.startBlockTwo);
        }

        if (updates.endBlockOne !== undefined) {
            updateFields.push("block_one_end = ?");
            values.push(updates.endBlockOne);
        }

        if (updates.endBlockTwo !== undefined) {
            updateFields.push("block_two_end = ?");
            values.push(updates.endBlockTwo);
        }

        if (updates.blockOneMean !== undefined) {
            updateFields.push("block_one_mean = ?");
            values.push(updates.blockOneMean);
        }

        if (updates.blockTwoMean !== undefined) {
            updateFields.push("block_two_mean = ?");
            values.push(updates.blockTwoMean);
        }

        if (updates.blockOneAccuracy !== undefined) {
            updateFields.push("block_one_accuracy = ?");
            values.push(updates.blockOneAccuracy);
        }

        if (updates.blockTwoAccuracy !== undefined) {
            updateFields.push("block_two_accuracy = ?");
            values.push(updates.blockTwoAccuracy);
        }

        if (updates.interventionStart !== undefined) {
            updateFields.push("intervention_start = ?");
            values.push(updates.interventionStart);
        }

        if (updates.interventionEnd !== undefined) {
            updateFields.push("intervention_end = ?");
            values.push(updates.interventionEnd);
        }

        if (updateFields.length === 0) {
            return new Response(JSON.stringify({ error: "No valid fields to update" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        values.push(participantId);
        const query = `UPDATE participants SET ${updateFields.join(", ")} WHERE participant_id = ?`;
        
        const result = db.prepare(query).run(...values);

        if (result.changes === 0) {
            return new Response(JSON.stringify({ error: "Participant not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ 
            message: "Participant updated successfully",
            participantId: participantId,
            updatedFields: Object.keys(updates)
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error updating participant:", error);
        return new Response(JSON.stringify({ error: "Failed to update participant" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}