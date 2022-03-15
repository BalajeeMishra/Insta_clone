import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
} from "reactstrap";
import "./post.css";
import { GoKebabHorizontal } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { ImShare } from "react-icons/im";
import { FaRegComment } from "react-icons/fa";
import { GrSave } from "react-icons/gr";
const Post = () => {
  return (
    <div>
      <Card className="card">
        <div className="headerofpost">
          <CardBody className="card_body1">
            <div className="image">
              <img alt="Card image cap" src="https://picsum.photos/318/180" />
            </div>
            <div>
              <CardTitle tag="h5">balajee__mishra</CardTitle>
              <CardSubtitle tag="p">Delhi,India</CardSubtitle>
            </div>
          </CardBody>
          <div className="dotted">
            <GoKebabHorizontal />
          </div>
        </div>
        <img
          alt="Card image cap"
          src="https://picsum.photos/318/180"
          width="100%"
        />
        <CardBody>
          <div className="iconatbottom">
            <div className="iconsbottomonleft">
              <AiOutlineHeart size={"30px"} />
              <FaRegComment size={"30px"} />
              <ImShare size={"30px"} />
            </div>
            <div>
              <GrSave size={"30px"} />
            </div>
          </div>
          <div className="display_inline">
            <CardTitle className="bottomtitle" tag="h6">
              1000 likes
            </CardTitle>
            <CardTitle tag="h6">balajee__mishra</CardTitle>

            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </div>
          <div className="p">
            <p>View all 6 comments</p>
            <p>10 hours ago</p>
          </div>
          <hr></hr>
          <input type="text" placeholder="Add a comment..." />
        </CardBody>
      </Card>
    </div>
  );
};
export default Post;
