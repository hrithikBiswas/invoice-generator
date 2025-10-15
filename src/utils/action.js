export const calculateTotals = (items, taxRate) => {
    const subtotal = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    const taxAmount = subtotal * (taxRate / 100);
    const totalAmount = subtotal + taxAmount;
    return { subtotal, taxAmount, totalAmount };
};
