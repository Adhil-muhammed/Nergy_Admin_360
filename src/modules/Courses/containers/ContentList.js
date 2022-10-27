import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export const ContentList = (props) => {
  const { contents, onDeleteContent } = props;
  const history = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const sectionId = searchParams.get("sectionId");

  return (
    <div className="col-12 mt-4">
      <h2>Contents</h2>
      {contents.length > 0 && (
        <Table responsive size="">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>File name</th>
              <td>Thumbnail</td>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contents?.map((content, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{content.title}</td>
                  <td>
                    {content.fileName && !content.isExternal ? (
                      <span>{content.fileName}</span>
                    ) : (
                      <a href={content.fileName} target="_blank">
                        {content.fileName}
                      </a>
                    )}
                  </td>
                  <td>
                    {content.fileURL && content.contentType == 0 ? (
                      //display pdf icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        class="w-1 h-1"
                        width="20%"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    ) : content.fileURL &&
                      (content.contentType == 1 || content.contentType == 2) ? (
                      // display video icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        class="w-1 h-1"
                        width="20%"
                      >
                        <path
                          stroke-linecap="round"
                          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    ) : content.fileURL && content.contentType == 3 ? (
                      //display pdf icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-1 h-1"
                        width="20%"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                        />
                      </svg>
                    ) : (
                      <span>No files</span>
                    )}
                    {/* {content.fileURL && !content.isVideo ? (
                      <img src={content.fileURL} style={{ height: "40px" }} />
                    ) : content.fileURL && content.isVideo ? (
                      <video controls width="240" height="">
                        <source src={content.fileURL} type="video/mp4"></source>
                      </video>
                    ) : content.fileURL && content.isVideo && content.isExternal ? (
                      <iframe width="240" height="" frameborder="0" src={content.fileURL}></iframe>
                    ) : (
                      <span>No files</span>
                    )} */}
                  </td>
                  <td>
                    {/* <Button color="danger" className="mt-4" size="sm" onClick={() =>
                      history(`../section/content/edit?sectionId=${sectionId}&courseId=${courseId}&contentId=${content.contentId} `)}>
                      <i className="bi bi-trash" style={{ fontSize: "10px" }}></i>{" "}
                      <span>Edit</span>
                    </Button> */}
                    <Button
                      color="danger"
                      className="mt-4"
                      size="sm"
                      onClick={() => {
                        onDeleteContent(content.contentId);
                      }}
                    >
                      <i className="bi bi-trash" style={{ fontSize: "10px" }}></i>{" "}
                      <span>Delete</span>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <div>
        <Button
          className="me-1 mb-1"
          color="primary"
          onClick={() =>
            history(`../section/content/create?sectionId=${sectionId}&courseId=${courseId}`)
          }
        >
          Add Content
        </Button>
      </div>
    </div>
  );
};
