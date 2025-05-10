package com.example.demo;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Validate")
public class Validate extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        String recipeName  = request.getParameter("recipeName");
        String description = request.getParameter("description");
        String category    = request.getParameter("category");
        String vegan       = request.getParameter("vegan");
        String serveMonth  = request.getParameter("serveMonth");
        String email       = request.getParameter("email");
        String spiceLevel  = request.getParameter("spiceLevel");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        out.println("{");
        out.println("  \"recipeName\": \"" + recipeName  + "\",");
        out.println("  \"description\": \"" + description + "\",");
        out.println("  \"category\": \""    + category    + "\",");
        out.println("  \"vegan\": \""       + vegan       + "\",");
        out.println("  \"serveMonth\": \""  + serveMonth  + "\",");
        out.println("  \"email\": \""       + email       + "\",");
        out.println("  \"spiceLevel\": \""  + spiceLevel  + "\"");
        out.println("}");
        out.flush();
        out.close();
    }
}
