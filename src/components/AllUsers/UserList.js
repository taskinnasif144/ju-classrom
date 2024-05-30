"use client";
import React, { useEffect, useState } from "react";
import UserBlock from "./UserBlock";
import queryAllData from "@/firebase/firestore/queryAllData";

const UserList = ({ isStudent }) => {
  const [users, setUsers] = useState([]);

  const removeUser = (user) => {
    setUsers(users.filter((u) => u !== user));
  };
  const addUser = (user) => {
    setUsers(...users, user);
  };

  useEffect(() => {
    const getUsers = async () => {
      if (isStudent) {
        const data = await queryAllData("users", "designation", "Student");
        console.log("data ---------- \n ------------- \n", data);
        setUsers(data);
      } else {
        const data = await queryAllData("users", "designation", "Faculty");
        setUsers(data);
      }
    };
    getUsers();
  });
  return (
    <div className="px-12 flex flex-col">
      <h3 className="text-5xl font-bold">
        {isStudent ? "Student" : "Faculty"}
      </h3>
      <div>
        {!users ? (
          <></>
        ) : (
          users.map((user) => (
            <UserBlock
              key={user.id}
              userData={user}
              rm={removeUser}
              isStudent={isStudent}
              add={addUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
