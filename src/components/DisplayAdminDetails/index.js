import "./index.css";

const DisplayAdminDetails = (props) => {
  const { userData, deleteUserDetails, onCheckboxSelect } = props;
  const { name, email, role, id, isChecked } = userData;

  const onDeleteUser = () => {
    deleteUserDetails(id);
  };

  const onSelectCheckbox = () => {
    onCheckboxSelect(id)
  };

  return (
    <>
      <tr>
        <td className="check-box">
          <input className="check-box-styles" 
          type="checkbox" 
          onChange={onSelectCheckbox} 
          checked={isChecked} />
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td className="user-delete-btn">
          <button
            className="delete-button"
            type="button"
            onClick={onDeleteUser}
            testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
              alt="delete"
              className="browser-delete-icon"
            />
          </button>
        </td>
      </tr>
    </>
  );
};
export default DisplayAdminDetails;
