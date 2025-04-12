const HeaderTop = () => {
  return (
    <div className="flex justify-between py-4 border-solid border-b border-opacity-10">
      <div className="flex flex-1 items-center gap-8">
        <div className="w-8 h-8 bg-gray-400"></div>
        <h1 className="font-semibold text-xl">Hi Kate!</h1>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <img src="chat.svg" alt="chat" />
        <img src="notification.svg" alt="notification" />
        <img src="partner.svg" alt="partner" />
        <img src="setting.svg" alt="setting" />
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default HeaderTop;
