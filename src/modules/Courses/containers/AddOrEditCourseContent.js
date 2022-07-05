import { ContentLayout, ModalLayout } from "shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Table } from "reactstrap";
import { useCourse } from "../hooks";
export const AddOrEditCourseContent = () => {
  const { courseId } = useParams();
  const editMode = courseId > 0;
  const {
    courseInfo,
    courseContent,
    setCourseContent,
    createCourseContent,
    courseContentInfo,
    editCourseContent,
    deleteCourseContent,
  } = useCourse({
    load: false,
    courseId: courseId,
  });

  const onHandleChange = (e, index) => {
    const { name, value } = e.target;
    setCourseContent((draft) => {
      draft[index][name] = value;
    });
  };

  const handleUpload = (e, index) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setCourseContent((draft) => {
      draft[index][name] = file;
    });
  };

  const addMoreContent = () => {
    setCourseContent((draft) => {
      draft = [
        ...draft,
        {
          courseId,
          title: "",
          contentFile: "",
          fileName: "",
        },
      ];
      return draft;
    });
  };
  const onRemoveContent = (index, id) => {
    deleteCourseContent.mutate(id);
    setCourseContent((draft) => {
      draft = draft.filter((c, idx) => idx !== index);
      return draft;
    });
  };

  const onSubmit = () => {
    courseContent.forEach((content, idx) => {
      createCourseContent.mutate(content);
    });
  };

  return (
    <ContentLayout
      title={"Course Content"}
      subtitle={editMode ? "Update" : "Create new"}
      isLoading={courseInfo.isLoading}
    >
      <section id="basic-vertical-layouts">
        {courseId}
        <div className="row match-height">
          <div className="col-12">
            <form className="form">
              <div className="form-body">
                <Table responsive size="">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>File name</th>
                      <th>Content file</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseContent.map((content, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="form-group">
                              <label htmlFor="first-title-vertical" className="mb-2">
                                Title
                              </label>
                              <Input
                                type="text"
                                id="first-title-vertical"
                                className="form-control"
                                name="title"
                                placeholder="Title"
                                value={content.title}
                                onChange={(e) => onHandleChange(e, index, true)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-group">
                              <label htmlFor="first-filename-vertical" className="mb-2">
                                File name
                              </label>
                              <Input
                                type="text"
                                id="first-filename-vertical"
                                className="form-control"
                                name="fileName"
                                placeholder="File name"
                                value={content.fileName}
                                onChange={(e) => onHandleChange(e, index, true)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-group">
                              <label htmlFor="contentFile" className="form-label">
                                Content file
                              </label>
                              <input
                                id="contentFile"
                                type="file"
                                className="form-control"
                                name="contentFile"
                                onChange={(e) => handleUpload(e, index, true)}
                              />
                            </div>
                          </td>
                          <td>
                            <Button color="primary" className="mt-4" onClick={() => {}}>
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              color="danger"
                              className="mt-4"
                              disabled={courseContent.length < 2}
                              onClick={() => onRemoveContent(index, content.courseId)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              {/* <button onClick={() => onUpdateContent()}>Update</button> */}
              <div className="col-12 d-flex justify-content-start mt-4">
                <Button
                  color="primary"
                  disabled={courseContent.length > 3}
                  onClick={() => {
                    addMoreContent();
                  }}
                >
                  Add row
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
