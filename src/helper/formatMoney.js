export const formatMoney = (money) => {
  let formattedAmount = money.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Nếu trình duyệt không hỗ trợ định dạng tiền tệ 'VND', bạn có thể thay thế chữ '₫' vào cuối chuỗi
  if (formattedAmount.includes("₫")) {
    formattedAmount = formattedAmount.replace("₫", " VND");
  }

  return formattedAmount;
};

export const renderArray = (number) => {
  const arr = [];
  for (let index = 0; index < number; index++) {
    arr.push(index);
  }
  return arr;
};
