import { db } from './firebase';
import { collection, doc, writeBatch, getDocs, query } from 'firebase/firestore';
import { menuData } from './data/menuData';

export const seedDatabase = async () => {
    try {
        console.log("Starting ROBUST Database Reset...");
        const itemsRef = collection(db, 'food_items');
        const snapshot = await getDocs(itemsRef);

        // 1. DELETE ALL EXISTING ITEMS (Chunked to handle >500 items)
        if (!snapshot.empty) {
            console.log(`Deleting ${snapshot.size} existing items...`);
            const chunks = [];
            let currentBatch = writeBatch(db);
            let count = 0;

            snapshot.docs.forEach((doc) => {
                currentBatch.delete(doc.ref);
                count++;
                if (count >= 400) {
                    chunks.push(currentBatch.commit());
                    currentBatch = writeBatch(db);
                    count = 0;
                }
            });
            if (count > 0) chunks.push(currentBatch.commit());

            await Promise.all(chunks);
            console.log("Deletion complete.");
        }

        // 2. PREPARE NEW ITEMS WITH ORDER
        console.log("Preparing freshly ordered items...");
        const allItems = [];
        Object.entries(menuData).forEach(([category, items]) => {
            items.forEach((item, index) => {
                allItems.push({
                    ...item,
                    category,
                    displayOrder: index
                });
            });
        });

        // 3. ADD NEW ITEMS (Chunked)
        console.log(`Adding ${allItems.length} new items...`);
        let addBatch = writeBatch(db);
        let addCount = 0;
        const addChunks = [];

        allItems.forEach((item) => {
            const docRef = doc(collection(db, 'food_items'));
            addBatch.set(docRef, {
                ...item,
                price: Number(item.price)
            });
            addCount++;
            if (addCount >= 400) {
                addChunks.push(addBatch.commit());
                addBatch = writeBatch(db);
                addCount = 0;
            }
        });
        if (addCount > 0) addChunks.push(addBatch.commit());

        await Promise.all(addChunks);
        console.log("Database reset and seeded successfully with correct order!");

    } catch (error) {
        console.error("Critical Error reseeding database:", error);
    }
};
