import OBR from "@owlbear-rodeo/sdk";
import type { Item } from "@owlbear-rodeo/sdk";
import type { Token, Note } from '../types';

const METADATA_PATH = "dev.racoon.collaborative-notes/note";

export class OwlbearService {
    // FIX: The type guard was incorrectly asserting the presence of a top-level `mime` property.
    // This property is not used when reading tokens and this makes the guard more accurate.
    private isImage(item: Item): item is Item & { image: { url: string; } } {
        return item.layer === "CHARACTER" && "image" in item;
    }

    async getTokens(): Promise<Token[]> {
        const items = await OBR.scene.items.getItems(this.isImage);
        return items.map(item => ({
            id: item.id,
            name: item.name,
            imageUrl: item.image.url
        }));
    }

    async getNotes(): Promise<Record<string, Note>> {
        const items = await OBR.scene.items.getItems(this.isImage);
        const notes: Record<string, Note> = {};
        for (const item of items) {
            const noteData = item.metadata[METADATA_PATH] as Note | undefined;
            if (noteData) {
                notes[item.id] = noteData;
            }
        }
        return notes;
    }

    async saveNote(tokenId: string, content: string, title: string, player: string): Promise<void> {
        const note: Note = {
            title,
            content,
            lastEditedBy: player,
        };
        await OBR.scene.items.updateItems([tokenId], (items) => {
            for (let item of items) {
                item.metadata[METADATA_PATH] = note;
            }
        });
    }
    
    // This is a mock function for easier testing without needing to manually add tokens in Owlbear.
    async addToken(): Promise<void> {
        const randomId = Math.random().toString(36).substring(7);
        const randomInt = Math.floor(Math.random() * 200) + 100;
        await OBR.scene.items.addItems([{
            id: randomId,
            type: "IMAGE",
            name: `Test Token ${randomId}`,
            layer: "CHARACTER",
            // FIX: Moved the 'mime' property inside the 'image' object to resolve the TypeScript error.
            // According to the Owlbear Rodeo SDK, it should be nested for image items.
            image: {
                url: `https://picsum.photos/id/${randomInt}/200/200`,
                width: 200,
                height: 200,
                mime: "image/jpeg",
            },
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            grid: {
                dpi: 100,
                scale: "100%",
            },
            visible: true,
        }]);
    }
}
