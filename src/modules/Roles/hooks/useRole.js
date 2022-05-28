import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getRoles, createRoles, updateRoles } from "..";
import { useNavigate, useLocation } from "react-router-dom";

const GetRolesKey = "GET_ROLES_API";

export const useRole = () => {
  const history = useNavigate();
  const location = useLocation();
  const [role, setRole] = useImmer({
    roleId: 0,
    name: "",
    status: 0,
  });

  const queryClient = useQueryClient();
  const rolesQuery = useQuery(GetRolesKey, getRoles, { staleTime: Infinity });

  const createRole = useMutation(createRoles, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetRolesKey);
      const data = queryClient.getQueryData(GetRolesKey);
      queryClient.setQueryData(GetRolesKey, (prevData) => {
        let updatedData = [...prevData, update];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetRolesKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const editRole = useMutation(updateRoles, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetRolesKey);
      const data = queryClient.getQueryData(GetRolesKey);
      queryClient.setQueryData(GetRolesKey, (prevData) => {
        let updatedData = prevData.map((p) => {
          let newData = { ...p };
          if (p.roleId === update.roleId) {
            newData.name = update.name;
            newData.startDate = update.startDate;
            newData.endDate = update.endDate;
          }
          return newData;
        });
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetRolesKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const onEdit = (id) => {
    const selectedRole = rolesQuery.data.filter((s) => s.roleId === id)[0];
    setRole((draft) => {
      draft.roleId = selectedRole.roleId;
      draft.name = selectedRole.name;
      draft.status = selectedRole.status;
      return draft;
    });
    history(`${location.pathname}/edit`);
  };

  const onDelete = (id) => {
    console.log("first", id);
  };

  return { role, setRole, rolesQuery, createRole, editRole, onEdit, onDelete };
};
