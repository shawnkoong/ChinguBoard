import React from "react";
import Avatar from "./Avatar";
import TeamDropdown from "./TeamDropdown";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutToken } from "../store/authReducer";
import { logoutUser } from "../store/userReducer";
import { resetProject } from "../store/projectReducer";
import { createTeam, resetAllTeams, resetTeam } from "../store/teamReducer";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const teams = useSelector((state) => state.team.allTeams);
  const teamMembers = useSelector((state) => state.team.members);

  let teamAvatars;
  let hiddenAvatarsCount;
  if (teamMembers !== null) {
    teamAvatars = teamMembers.slice(0, 4);
    hiddenAvatarsCount = teamMembers.length - teamAvatars.length;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutToken());
    dispatch(logoutUser());
    dispatch(resetProject());
    dispatch(resetTeam());
    dispatch(resetAllTeams());
    navigate("/");
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    dispatch(createTeam());
  };

  return (
    <nav
      className="grid grid-cols-5 gap-none
     items-center px-5 mx-auto bg-white-100"
    >
      <div className="flex justify-start">
        <div className="font-sans text-2xl text-blue-500 ml-2 font-bold">
          Chingu Board
        </div>
      </div>

      <div className="col-span-3">
        <div className="grid grid-cols-4 gap-1">
          <div className="flex justify-end items-center mr-3">
            <button
              className="cursor-pointer rounded-lg bg-[#16558f54] py-2 shadow-md"
              onClick={(e) => handleCreateTeam(e)}
            >
              <span className="block text-black text-sm px-2">Create Team</span>
            </button>
          </div>
          <div className="flex items-center col-span-3">
            <div>{teams && <TeamDropdown teams={teams} />}</div>
            <div className="flex p-3">
              {teamMembers &&
                teamAvatars.map((member, index) => (
                  <Avatar
                    key={index}
                    size={12}
                    src={member.avatarUrl}
                    alt="team member"
                  />
                ))}
              {hiddenAvatarsCount > 0 && (
                <div className="flex items-center justify-center rounded-full w-12 h-12 text-sm font-semibold border-2 border-blue-400 bg-indigo-200 text-gray-600">{`+ ${hiddenAvatarsCount}`}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="grid grid-cols-3 gap-2 items-center">
          <button>
            onClick={window.open("https://github.com/shawnkoong/ChinguBoard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </button>
          <button
            className="rounded-lg bg-[#16558f54] py-2 shadow-md cursor-pointer px-2 text-sm"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
          <div>
            <button
              className="justify-self items-center"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <Avatar size={12} src={user.avatarUrl} alt={"user"} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
