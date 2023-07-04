import React, { Component } from "react";
import axios from "axios";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Container } from "@material-ui/core";
import "./contact.css"
export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitEmail(e) {
    // e.preventDefault();

    // const { name, email, subject, message } = this.state;

    // axios
    //   .post("http://localhost:3333/api/send", {
    //     name: name,
    //     email: email,
    //     subject: subject,
    //     message: message,
    //   })
    //   .then((response) => {
    //     if (response.data.status === "success") {
    //       alert("Message Sent.");
    //       this.resetForm();
    //     } else if (response.data.status === "fail") {
    //       console.log(response);
    //     }
    //   });
  }

  resetForm() {
    this.setState({ name: "", email: "", subject: "", message: "" });
  }

  render() {
    return (
      <section className="ftco-section" style={{ marginTop: "30px",marginBottom:"30px" }}>
      <Container className="container">
          <div className="row justify-content-center">
            <div className="col-8"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row no-gutters mb-5">
                  <div className="col-md-7">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-4">Contact Us</h3>
                      <div id="form-message-warning" className="mb-4"></div>
                   
                      {/* <form
                        onSubmit={this.submitEmail.bind(this)}
                        id="contactForm"
                        name="contactForm"
                        className="contactForm"
                      > */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="name">
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={this.onInputChange.bind(this)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="email">
                                Email Address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.onInputChange.bind(this)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="subject">
                                Subject
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="subject"
                                id="subject"
                                placeholder="Subject"
                                value={this.state.subject}
                                onChange={this.onInputChange.bind(this)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="#">
                                Message
                              </label>
                              <textarea
                                name="message"
                                className="form-control"
                                id="message"
                                cols="30"
                                rows="4"
                                placeholder="Message"
                                value={this.state.message}
                                onChange={this.onInputChange.bind(this)}
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group" style={{marginTop:"10px"}}>
                              <button
                                type="submit"
                                className="btn btn-primary"
                              >Send Message</button>
                              <div className="submitting"></div>
                            </div>
                          </div>
                        </div>
                      {/* </form> */}
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-stretch">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3194.6413324938558!2d10.178156749749864!3d36.80314902452845!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd354cc49b26cd%3A0x96656814ccaecbfc!2sElectrozayn!5e0!3m2!1sfr!2stn!4v1685793344025!5m2!1sfr!2stn"
                      width="600"
                      height="500"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Address:</span>1 Rue de Pirée rue d'Athènes Tunis 1000
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Phone:</span> <a>+216 22 181 411</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Phone:</span> <a>+216 55 181 417</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Email:</span> <a>Electrozayne@gmail.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col" style={{justifyContent:"center"}}>
                    <div className="dbox w-100 text-center" >
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Website:</span> <a href="https://www.electrozayn.com/">www.electrozayn.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}
