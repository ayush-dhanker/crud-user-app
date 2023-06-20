import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  editUserDetails,
  removeAll,
  removeUser,
} from "./store/UserData/actions";
import DeleteAllModal from "./DeleteAllModal";

const Table = () => {
  const dispatch = useDispatch();

  const { users, emails } = useSelector((state) => ({
    users: state.userDetails.users,
    emails: state.userDetails.emails,
  }));

  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [emailOld, setEmailOld] = useState();
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const toggle = () => setModal(!modal);

  var node = useRef();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: editUser?.name || "",
      phone: editUser?.number || "",
      email: editUser?.email || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().length(10).required("Please Enter Your Phone"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      dispatch(
        editUserDetails(values.name, values.email, values.phone, emailOld)
      );
    },
  });

  const columns = [
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "number",
      text: "Contact",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email ",
      sort: true,
    },
    {
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <Button
            color="info"
            className="me-2"
            style={{ marginTop: "2px" }}
            onClick={() => {
              toggle();
              setEditUser(row);
              setEmailOld(row?.email);
            }}
          >
            Edit
          </Button>
          <Button
            color="danger"
            style={{ marginTop: "2px" }}
            onClick={() => dispatch(removeUser(row?.email))}
          >
            Remove
          </Button>
        </>
      ),
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: users?.length,
    custom: true,
  };

  const handleDeleteAllNotes = () => {
    dispatch(removeAll());
    setDeleteAllModal(false);
  };

  return (
    <>
      <DeleteAllModal
        show={deleteAllModal}
        onDeleteClick={handleDeleteAllNotes}
        onCloseClick={() => setDeleteAllModal(false)}
      />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="mb-3">
              <Label className="fw-m">Name</Label>
              <Input
                name="name"
                placeholder="Enter Name"
                type="text"
                className="mb-2"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.name || ""}
                invalid={
                  validation.touched.name && validation.errors.name
                    ? true
                    : false
                }
              />
              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">
                  {validation.errors.name}
                </FormFeedback>
              ) : null}

              <Label>Phone</Label>
              <Input
                name="phone"
                placeholder="Enter Phone No."
                type="number"
                className="mb-2"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.phone || ""}
                invalid={
                  validation.touched.phone && validation.errors.phone
                    ? true
                    : false
                }
              />
              {validation.touched.phone && validation.errors.phone ? (
                <FormFeedback type="invalid">
                  {validation.errors.phone}
                </FormFeedback>
              ) : null}

              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter valid email"
                className="mb-2"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email || ""}
                invalid={
                  validation.touched.email && validation.errors.email
                    ? true
                    : false
                }
              />
              {validation.touched.email && validation.errors.email ? (
                <FormFeedback type="invalid">
                  {validation.errors.email}
                </FormFeedback>
              ) : null}
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Button type="submit" color="primary" onClick={toggle}>
                Add
              </Button>
              <Button type="reset" color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <Row>
        <Col>
          <Card style={{ border: "none" }}>
            <CardBody>
              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="email"
                columns={columns}
                data={users}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="email"
                    data={users}
                    columns={columns}
                    bootstrap4
                    search
                  >
                    {(toolkitProps) => (
                      <React.Fragment>
                        <Row
                          className="mb-2"
                          style={{ justifyContent: "space-between" }}
                        >
                          <Col style={{ textAlign: "left" }}>
                            <Link to="/addUser">
                              <Button
                                type="button"
                                color="primary"
                                className="btn-rounded"
                              >
                                Add User
                              </Button>
                            </Link>
                          </Col>
                          <Col style={{ textAlign: "end" }}>
                            <Button
                              type="button"
                              color="danger"
                              className="btn-rounded"
                              onClick={() => {
                                setDeleteAllModal(true);
                              }}
                            >
                              Delete All User
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField="email"
                                data={users}
                                columns={columns}
                                headerClasses="table-light"
                                classes={
                                  "table align-middle table-nowrap table-check "
                                }
                                headerWrapperClasses={"table-light"}
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                                ref={node}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="align-items-md-center mt-30">
                          <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                            <PaginationListStandalone {...paginationProps} />
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Table;
