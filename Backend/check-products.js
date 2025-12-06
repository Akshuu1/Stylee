const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkData() {
    try {
        const userCount = await prisma.user.count();
        const itemCount = await prisma.item.count();
        const items = await prisma.item.findMany({ take: 5 });

        console.log(`Users count: ${userCount}`);
        console.log(`Items count: ${itemCount}`);

        if (itemCount > 0) {
            console.log("Sample items:");
            items.forEach(item => {
                console.log(`- ${item.name} (${item.id})`);
            });
        } else {
            console.log("No items found in the database.");
        }
    } catch (error) {
        console.error("Error checking data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkData();
