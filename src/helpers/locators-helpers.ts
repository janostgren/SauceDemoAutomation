export const getButtonInNavSelectorByText = (buttonName: string) => `nav >> text=${buttonName}`;
export const getButtonSelectorByText = (buttonName: string) => `button:has-text("${buttonName}")`;
export const getTextSelectorByText = (text: string) => `text=${text}`;
export const getLabelSelectorByText = (text: string) => `label:has-text("${text}")`;
