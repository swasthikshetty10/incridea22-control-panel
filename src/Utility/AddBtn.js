const AddBtn = (props) => {
  return (
    <button className="flex items-center justify-between px-3 py-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 hover:shadow-lg focus:outline-none">
      <span className="text-xl font-extrabold -translate-y-[2px]">+</span>
      Add
    </button>
  );
};

export default AddBtn;
