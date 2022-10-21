import { useState } from "react";
import { usePermission } from "..";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Label,
    Input,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { ContentLayout } from "shared/components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingButton } from "shared/components/LoadingButton";




export const PermissionList = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const userRole = searchParams.get("userRole");

    const [open, setOpen] = useState('0');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };
    const {
        updatePermission,
        modulePermissions,
        setmodulePermissions
    } = usePermission({ userRole });

    const permissionChanged = (e, data) => {
        const { name } = e.target;
        setmodulePermissions((draft) => {
            const module = draft.find(s => s.name === data.name);
            const action = module.actions.find(s => s.name === name);
            action.allowed = !action.allowed;
            return draft;
        });
    };

    const onSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        updatePermission.mutate({ userRole, modulePermissions });
    };

    const onCancel = () => {
        navigate("..", { replace: true });
    };

    return <ContentLayout
        title={"Update"}
        breadcrumb={[
            { label: "Roles", location: "/admin/role" },
            { label: "Edit Permission" },
        ]}
    >
        {
            modulePermissions.length > 0 ? <Accordion open={open} toggle={toggle}>
                {
                    modulePermissions.map((module, index) => {
                        const targetId = (index + 1).toString();
                        return <AccordionItem key={`AccordionItem${index}_${module.name}`}>
                            <AccordionHeader key={`AccordionHeader${index}_${module.name}`} targetId={targetId}>{module.name}</AccordionHeader>
                            <AccordionBody key={`AccordionBody_${index}_${module.name}`} accordionId={targetId}>
                                <ListGroup>
                                    {
                                        module.actions.map((action, index) => {
                                            return <ListGroupItem key={`div_${index}_${action.name}`} >
                                                <Input
                                                    type="checkbox"
                                                    name={action.name}
                                                    onChange={(e) => permissionChanged(e, module)}
                                                    value={action.allowed}
                                                    checked={action.allowed}
                                                />
                                                <Label check>{action.title}</Label>
                                            </ListGroupItem>
                                        })
                                    }
                                </ListGroup>
                            </AccordionBody>
                        </AccordionItem>
                    })
                }
            </Accordion> : <div>Loading...</div>
        }
        <div className="col-12 d-flex justify-content-end">
            <LoadingButton
                className="me-1 mb-1"
                color="success"
                onClick={(e) => {
                    onSubmit(e);
                }}
            >
                {"Update"}
            </LoadingButton>

            <button
                type="reset"
                className="btn btn-light-secondary me-1 mb-1"
                onClick={() => onCancel()}
            >
                Cancel
            </button>
        </div>


    </ContentLayout>
}