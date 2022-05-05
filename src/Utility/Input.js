const Input = (props) => {
  return (
    <input
      //   onChange={(e) => {
      //     let criteriaObj = {
      //       ...modal.round.judges[i].criteria[ix],
      //       score: parseInt(e.target.value),
      //     };
      //     let criteria = [...modal.round.judges[i].criteria];
      //     criteria[ix] = criteriaObj;
      //     let judges = [...modal.round.judges];
      //     judges[i] = { ...judges[i], criteria };
      //   }}
      {...props}
      type="number"
      placeholder="Enter Score"
      className={"px-3 py-3 placeholder-slate-300 numinput text-slate-700 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring  w-14 " + `${props.className}`}
    />
  );
};

export default Input;
