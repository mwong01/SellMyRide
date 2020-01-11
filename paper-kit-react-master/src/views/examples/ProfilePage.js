/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
import axios from "axios";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { useCookies } from "react-cookie";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";


function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const [cookies, setCookie] = useCookies(["name", "user_id"]);
  const [arrListing, setArrListing] = useState([]);
  const [del, setDel] = useState(0);
  

  useEffect(() => {

    let id = 3
    axios.get(`http://localhost:8001/api/listing/profile/${id}`).then(res => {
      setArrListing(res.data);
    });

  }, []);

  let generateListing = arrListing.map(list => {
                                      console.log(list.id);
                                       return (
                                                  <li>
                                                  <Row>
                                                  <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                                                    <img
                                                      alt="..."
                                                      className="img-circle img-no-padding img-responsive"
                                                      src={list.listing_image}
                                                    />
                                                  </Col>
                                                  <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                                                    <h6>
                                                      {list.year} {list.make} {list.model} <br />
                                                    </h6>
                                                  </Col>
                                                  <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                  <div className="text-center">
                                                    <Button 
                                                    className="btn-round" 
                                                    color="warning" 
                                                    outline
                                                    onClick={() => {
                                                                    
                                                                    deleteListing(list.id)
                                                    }}
                                                    >
                                                      Delete Listing
                                                    </Button>
                                                  </div>
                                                  </Col>
                                                </Row>
                                              </li>
                                              )
                                           });


  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  let deleteListing = function(e) {

    axios.delete(`/api/listing/${e}`);
  };

  return (
    <>
      <IndexNavbar />
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/default-avatar.png")}
              />
            </div>
            <div className="name">
              <h4 className="title">email@email.com</h4>
            </div>
          </div>
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Current Listings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    My Messages
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Previous Listings
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <TabContent className="following" activeTab={activeTab}>
            <TabPane tabId="1" id="follows">
              <Row>
                <Col className="ml-auto mr-auto" md="6">
                  <ul className="list-unstyled follows">

                  {generateListing}

                  </ul>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="text-center" tabId="2" id="following">
              <h3 className="text-muted">Your inbox is empty!</h3>
              <Button 
              className="btn-round" 
              color="warning" 
              outline
              >
                Delete Message
              </Button>
            </TabPane>
            <TabPane className="text-center" tabId="3" id="following">
              <h3 className="text-muted">No previous listings!</h3>
            </TabPane>
          </TabContent>
        </Container>
      </div>
    </>
  );
}

export default ProfilePage;
