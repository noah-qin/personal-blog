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

    const runCommand = (command: () => unknown) => {
        setOpen(false);
        command();
    };

    return (
        <>
            {/* Toggle Button for mobile or click users */}
            <button
                onClick={() => setOpen((open) => !open)}
                className="fixed bottom-4 right-4 z-50 p-3 bg-[var(--color-primary)] text-[var(--color-primary-fg)] rounded-full shadow-lg hover:opacity-90 transition-all md:hidden"
                aria-label="Open Command Menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Global Command Menu"
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-[var(--color-card)] rounded-xl shadow-2xl border border-[var(--color-border)] p-2 z-50 overflow-hidden"
                containerClassName="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40"
            >
                <div className="flex items-center border-b border-[var(--color-border)] px-3 pb-2 pt-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--color-text-muted)] mr-2"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <Command.Input
                        className="w-full bg-transparent border-none text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-0 text-base h-10"
                        placeholder="Search for projects, essays, or commands..."
                    />
                </div>
                <Command.List className="max-h-[min(400px,80vh)] overflow-y-auto overflow-x-hidden p-2">
                    <div className="py-2">
                        <Command.Group heading="Navigation" className="text-xs font-medium text-[var(--color-text-muted)] mb-1 px-2 mt-2">
                            <Command.Item
                                onSelect={() => runCommand(() => window.location.href = "/")}
                                className="flex items-center px-2 py-2 text-sm text-[var(--color-text-main)] rounded-md hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                            >
                                Home
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.location.href = "/projects")}
                                className="flex items-center px-2 py-2 text-sm text-[var(--color-text-main)] rounded-md hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                            >
                                Projects
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.location.href = "/blog")}
                                className="flex items-center px-2 py-2 text-sm text-[var(--color-text-main)] rounded-md hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                            >
                                Writing
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.location.href = "/about")}
                                className="flex items-center px-2 py-2 text-sm text-[var(--color-text-main)] rounded-md hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                            >
                                About
                            </Command.Item>
                        </Command.Group>
                        <Command.Group heading="Socials" className="text-xs font-medium text-[var(--color-text-muted)] mb-1 px-2 mt-2">
                            <Command.Item
                                onSelect={() => runCommand(() => window.open("https://github.com/imnotnoahhh", "_blank"))}
                                className="flex items-center px-2 py-2 text-sm text-[var(--color-text-main)] rounded-md hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                            >
                                GitHub
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.open("https://twitter.com", "_blank"))}
                                className="flex items-center px-2 py-2 text-sm text-[var(--color-text-main)] rounded-md hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                            >
                                Twitter
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.location.href = "mailto:contact@noahqin.com")}
                                className="flex items-center px-2 py-2 text-sm text-[var(--color-text-main)] rounded-md hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                            >
                                Email
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => window.open("/resume.pdf", "_blank"))}
                                className="flex items-center px-2 py-2 text-sm text-[var(--color-text-main)] rounded-md hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                            >
                                Resume
                            </Command.Item>
                        </Command.Group>
                    </div>
                </Command.List>
            </Command.Dialog>
        </>
    );
};


