export const adminAccess = (designation) => {
  if (designation == "Super-Admin") {
    return true;
  } else {
    return false;
  }
};

export const studentAccess = (designation) => {
  if (designation == "Student") {
    return true;
  } else {
    return false;
  }
};

export const facultyAccess = (designation) => {
  if (designation == "Faculty") {
    return true;
  } else {
    return false;
  }
};

export const facultyOrStudentAccess = (designation) => {
  if (designation == "Faculty" || designation == "Student") {
    return true;
  } else {
    return false;
  }
};
export const facultyOrAdminAccess = (designation) => {
  if (designation == "Faculty" || designation == "Super-Admin") {
    return true;
  } else {
    return false;
  }
};
