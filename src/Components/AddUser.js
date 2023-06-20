import React from "react";
import {
  Card,
  CardBody,
  Row,
  Form,
  Input,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addUser } from "./store/UserData/actions";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { emails } = useSelector((state) => ({
    emails: state.userDetails.emails,
  }));

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().length(10).required("Please Enter Your Phone"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      if (!emails.includes(values.email)) {
        dispatch(addUser(values.name, values.email, values.phone));
        navigate("/");
      } else {
        alert("enter unique email");
      }
    },
  });

  return (
    <>
      <Row>
        <Card>
          <CardBody>
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
                <Button type="submit" color="primary">
                  Add
                </Button>
                <Button type="reset" color="secondary">
                  Cancel
                </Button>
                <Link to="/">
                  <Button color="dark" outline={true}>
                    Back
                  </Button>
                </Link>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

export default AddUser;
