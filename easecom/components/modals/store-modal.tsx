'use client'

import {Modal} from "@/components/ui/modal";
import {userStoreModal} from "@/hooks/use-store-modal";

export const StoreModal = () => {
    const storeModal = userStoreModal();
    return(
    <Modal title= "Create Store "
           description= "Add a new store"
           isOpen={storeModal.isOpen}
           onClose={storeModal.onClose}
    >
        Future Create Store Form
    </Modal>
    );
};