import React, { useState } from "react";
import ImageModal from "./ImageModal";
import Moment from "react-moment";
import 'moment-timezone'
import {
  Button,
  Card,
  Container,
  Col,
  Collapse
} from "react-bootstrap";

function Cards({
  posts,
  setPosts,
  post,
}) {
  const [postLikes, setPostLikes] = useState();
  const [open, setOpen] = useState(true);
  //modal state
  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = React.useState("");

  function handleDeleteClick() {
    console.log("test");
    fetch(`http://localhost:9292/post/${post.id}`, {
      method: "DELETE",
    }).then(() => handleDeletePost(post.id));
  }

  function handleDeletePost(id) {
    const updatedPosts = posts.filter((post) => {
      return post.id !== id;
    });
    setPosts(updatedPosts);
  }

  function handleLikes() {
    setPostLikes(postLikes + 1);

    fetch(`http://localhost:9292/post/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: post.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedItem) => handleUpdateLikes(updatedItem));
  }

  function handleUpdateLikes(updatedItem) {
    const updatedItems = posts.map((post) => {
      if (post.id === updatedItem.id) {
        return updatedItem;
      } else {
        return post;
      }
    });
    setPosts(updatedItems);
  }

  //Modal
  function handleClick(e) {
    setImage(post.photo_url);
    setModalShow(true);
  }

  return (
    <div>
      {/* Modal */}
      <ImageModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        image={image}
      />
      <Container className="d-flex align-items-center justify-content-center rounded">
        <Card
          className="mt-5 shadow-lg p-3 mb-5 bg-body rounded text-center main-card"
          style={{ width: "75%" }}
        >
          <Card.Img
            className={"ratio ratio-1x1"}
            variant="top"
            src={post.photo_url}
            alt={post.artist}
            onClick={handleClick}
          />
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="outline-dark"
            size="sm"
            className="mt-2 p-2 text-muted"
          >
            Click To Hide/Expand
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text rounded-lg">
              <Card.Body>
                <Card.Title>
                  <h2 className="text-uppercase mt-2 h2-title">{post.artist}</h2>
                  <h5 className="h5-subtitle">{`${post.location}`}</h5>
                  <h6 className="text-muted mt-4">Posted By: {post.user.user_name}</h6>
                  
                </Card.Title>
                <hr></hr>
                <Card.Text>
                  <Col>
                    <button
                      onClick={handleLikes}
                      className="btn btn-outline-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                      </svg>
                    </button>
                  </Col>
                </Card.Text>
                <Card.Text>
                  <Col className=""><h4>{post.likes} LIKES</h4></Col>
                </Card.Text>
                <Card.Text>
                  <Col className="text-muted">
                
                    <Card.Text><h6>
                      <Col className="">Date Posted:{' '}  
                        <Moment fromNow ago>
                         {post.post_date}
                        </Moment> ago
                      </Col></h6>
                    </Card.Text>
                  </Col>
                </Card.Text>
                <hr></hr>
                <Button onClick={handleDeleteClick} className="btn-danger">
                  DELETE
                </Button>
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      </Container>
    </div>
  );
}

export default Cards;


