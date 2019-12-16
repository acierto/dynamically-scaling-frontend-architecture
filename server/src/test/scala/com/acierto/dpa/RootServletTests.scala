package com.acierto.dpa

import org.scalatra.test.scalatest._

class RootServletTests extends ScalatraFunSuite {

  addServlet(classOf[RootServlet], "/*")

  test("GET / on RootServlet should return status 200") {
    get("/") {
      status should equal (200)
    }
  }

}
