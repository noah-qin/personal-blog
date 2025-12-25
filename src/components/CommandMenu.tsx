import { Command } from 'cmdk';
import { useEffect, useState } from 'react';

export const CommandMenu = () => {
    const [open, setOpen] = useState(false);

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <>
            {/* Toggle Button for mobile or click users */}
            <button
                onClick={() => setOpen((open) => !open)}
                className="fixed bottom-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition-all md:hidden"
                aria-label="Open Command Menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Global Command Menu"
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden p-0 z-[100]"
                // Overlay styling
                containerClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
            >
                <div className="flex items-center border-b border-zinc-800 px-3" cmdk-input-wrapper="">
                    <svg className="w-4 h-4 text-zinc-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    <Command.Input
                        autoFocus
                        placeholder="Type a command or search..."
                        className="w-full bg-transparent py-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                    />
                    <div className="hidden md:flex items-center gap-1">
                        <kbd className="bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded text-[10px] font-mono border border-zinc-700">ESC</kbd>
                    </div>
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scroll-py-2">
                    <Command.Empty className="py-6 text-center text-sm text-zinc-500">No results found.</Command.Empty>

                    <Command.Group heading="Navigation" className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-2 px-2">
                        <Item onSelect={() => window.location.href = '/'}>Home</Item>
                        <Item onSelect={() => window.location.href = '/projects'}>Projects</Item>
                        <Item onSelect={() => window.location.href = '/blog'}>Essays</Item>
                        <Item onSelect={() => window.location.href = '/about'}>About</Item>
                    </Command.Group>

                    <Command.Group heading="Social" className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-2 px-2 mt-4">
                        <Item onSelect={() => window.open('https://github.com/yourusername', '_blank')}>GitHub</Item>
                        <Item onSelect={() => window.open('https://twitter.com/yourusername', '_blank')}>Twitter / X</Item>
                    </Command.Group>
                </Command.List>
            </Command.Dialog>
        </>
    );
};

// Helper Component for Item Styling
function Item({ children, onSelect }: { children: React.ReactNode; onSelect: () => void }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 rounded-lg cursor-pointer hover:bg-zinc-800 hover:text-white aria-selected:bg-zinc-800 aria-selected:text-white transition-colors"
        >
            {children}
        </Command.Item>
    );
}
