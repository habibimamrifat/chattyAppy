import { Model } from "mongoose";

// Utility function to enforce Document compatibility
const asDocumentModel = <T>(model: Model<T>): Model<T & Document> => {
    return model as Model<T & Document>;
};

// Utility function to generate IDs for collections

const collectionIdGenerator = async <T extends Document>(
    model: Model<T>, // Accept a Mongoose model
    idFor: string // The type of ID to generate
): Promise<string> => {
    const prefix = idFor.substring(0, 3).toUpperCase(); // Prefix from idFor

    try {
        // Fetch the last record sorted by `id` in descending order
        const lastRecord = await model
            .findOne() // Create a query
            .sort({ id: -1 }) // Sort by `id` in descending order
            .exec(); // Execute the query

        let newId: string;

        if (lastRecord) {
            // Extract the numeric part of the ID and increment it
            const lastNumber = parseInt(lastRecord.id.substring(3), 10);
            const incrementedNumber = lastNumber + 1;

            // Create the new ID
            newId = `${prefix}${incrementedNumber.toString().padStart(2, "0")}`;
        } else {
            // If no record exists, start with "00"
            newId = `${prefix}00`;
        }

        return newId;
    } catch (error: any) {
        throw new Error(`Error generating ID: ${error.message}`);
    }
};




const idGenerator = {
    collectionIdGenerator,
    asDocumentModel};

export default idGenerator;