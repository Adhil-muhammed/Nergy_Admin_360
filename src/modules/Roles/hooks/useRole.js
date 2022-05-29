import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getRoles, createRoles, updateRoles, deteleRoles } from "..";
import { useNavigate, useLocation } from "react-router-dom";
import { successMessage, successDeletedMessage } from "utils";

const GetRolesKey = "GET_ROLES_API";

export const useRole = () => {
  const history = useNavigate();
  const location = useLocation();
  const [role, setRole] = useImmer({
    roleId: "",
    name: ""
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
    onSuccess: () => {
      successMessage();
      history(`${location.pathname}`.replace("/create",""));
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
    onSuccess: () => {
      successMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const deleteRole = useMutation(deteleRoles, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetRolesKey);
      const data = queryClient.getQueryData(GetRolesKey);
      queryClient.setQueryData(GetRolesKey, (prevData) => {
        let index = prevData.findIndex(o => o.roleId == update.roleId);

        prevData.splice(index, 1);
        return prevData;

        // let updatedData = prevData.map((p) => {
        //   let newData = { ...p };
        //   if (p.roleId === update.roleId) {
        //     newData.name = update.name;
        //   }
        //   return newData;
        // });
        // return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetRolesKey, previousData);
    },
    onSuccess: () => {
      successDeletedMessage();
      window.location.reload();
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
      return draft;
    });
    history(`${location.pathname}/edit`);
  };


  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      const selectedRole = rolesQuery.data.filter((s) => s.roleId === id)[0];
      deleteRole.mutate(selectedRole);
    }
  };

  return { role, setRole, rolesQuery, createRole, editRole, deleteRole, onEdit, onDelete };
};
