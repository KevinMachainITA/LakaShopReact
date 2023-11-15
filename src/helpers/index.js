export const formatMoney = (number) => {
    const formatNumber = parseFloat(number).toFixed(2);
    const newNumber = `$${formatNumber}`;
    return newNumber;
}

export const calculateDiscountedPrice = (price, discount, amount) => {
    const discountedPrice = price - (price * (discount / 100));
    const subtotal = discountedPrice * amount
    // Redondear el precio con descuento a 2 decimales
    return subtotal.toFixed(2);
};