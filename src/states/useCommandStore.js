import create from 'zustand';

export const useCommandStore = create((set) => ({
  isOpen: false,
  inputValue: '',
  commands: [
    {
      name: 'Open File',
      type: 'system',
      action: () => console.log('Opening file...'),
    },
    {
      name: 'Save File',
      type: 'system',
      action: () => console.log('Saving file...'),
    },
    {
      name: 'Close File',
      type: 'system',
      action: () => console.log('Closing file...'),
    },
  ],
  filteredCommands: [],
  setIsOpen: (isOpen) => set((state) => ({ ...state, isOpen })),
  setInputValue: (inputValue) => set((state) => ({ ...state, inputValue })),
  setFilteredCommands: (filteredCommands) =>
    set((state) => ({ ...state, filteredCommands })),
  setCommands: (commands) => set((state) => ({ ...state, commands })),
}));