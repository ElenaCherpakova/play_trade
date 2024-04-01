import { DELETE } from "@/app/api/cards/[id]/route";

// Handler for deleting an item
const handleDeleteItemClick = async (itemId) => {
    try {
        const response = await DELETE(`/api/cards/[id]`);
        if (response.success) {
            // Item successfully deleted, perform any necessary UI updates
            console.log("Item deleted successfully.");
        } else {
            // Handle error scenario
            console.error(response.message);
        }
    } catch (error) {
        // Handle network or other errors
        console.error("An error occurred while deleting the item:", error);
    }
};
