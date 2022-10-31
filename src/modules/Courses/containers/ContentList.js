import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import pdficon from "../../../assets/images/pdf/pdf.png";

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
                    {content.fileURL && content.contentType === 0 ? (
                      <img src={pdficon} style={{ height: "40px" }} />
                    ) : content.fileURL && content.contentType === 1 ? (
                      <video controls width="200" height="">
                        <source src={content.fileURL} type="video/mp4"></source>
                      </video>
                    ) : content.fileURL && content.contentType === 2 ? (
                      <iframe
                        width="200"
                        height="100"
                        frameborder="0"
                        src={content.fileURL}
                      ></iframe>
                    ) : content.fileURL && content.contentType === 3 ? (
                      <i className="bi bi-link-45deg" style={{ fontSize: "35px" }}></i>
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
