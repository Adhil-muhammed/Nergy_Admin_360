import { Table } from "reactstrap";
import { usePermission } from "..";
import { Input, FormFeedback, Label, Button } from "reactstrap";


export const PermissionList = (props) => {
    const { userRole } = props;
    const { permissionQuery,
        selectedPermission,
        setSelectedPermission,
    } = usePermission({ userRole });
    const { data, isLoading } = permissionQuery;

    const permissionChanged = (e) => {
        const { name } = e.target;
        // setSelectedPermission((draft) => {
        //     const action = draft.actions.find(s => s.name === name);
        //     action.allowed = !action.allowed;
        //     return draft
        // });

        // setPermissions((draft) => {
        //     const module = draft.find(s => s.name === selectedPermission.name);
        //     const action = module.actions.find(s => s.name === name);
        //     action.allowed = !action.allowed;
        //     return draft
        // });
    };

    return <>
        {
            data ? <Table bordered>
                <thead>
                    <tr>
                        <th>Module</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((module, index) => {
                            return <tr key={`tr_${index}_${module.name}`}>
                                <th key={`th_${index}_${module.name}`} scope="row">{module.name}</th>
                                {
                                    module.actions.map((action, index) => {
                                        return <td key={`td_${index}_${action.name}`}>
                                            <div className="form-group">
                                                <Input
                                                    type="checkbox"
                                                    name={action.name}
                                                    onChange={permissionChanged}
                                                    value={action.allowed}
                                                    checked={action.allowed}
                                                    disabled={selectedPermission.name != module.name}
                                                />
                                                <Label check>{action.name}</Label>
                                            </div>
                                        </td>
                                    })
                                }
                                <td>
                                    {
                                        selectedPermission.name != module.name &&
                                        <Button outline color="primary" size="sm" onClick={() => {
                                            setSelectedPermission(draft => {
                                                draft.name = module.name;
                                                draft.actions = module.actions;
                                            })
                                        }}>
                                            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i>
                                        </Button>
                                    }
                                    {
                                        selectedPermission.name == module.name &&
                                        <>
                                            <Button outline color="primary" size="sm" onClick={() => {
                                                setSelectedPermission(draft => {
                                                    draft.name = module.name;
                                                    draft.actions = module.actions;
                                                })
                                            }}>
                                                Update
                                            </Button>
                                            <Button outline color="primary" size="sm" onClick={() => {
                                                setSelectedPermission(draft => {
                                                    draft.name = "";
                                                    draft.actions = [];
                                                })
                                            }}>
                                                Cancel
                                            </Button>
                                        </>

                                    }
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table> : <div>Loading..</div>
        }

    </>
}