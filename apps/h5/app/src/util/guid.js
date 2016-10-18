let id = 0;

const guid = () => {
  ++id;
  return 'medz_'+id;
};

export default guid;
