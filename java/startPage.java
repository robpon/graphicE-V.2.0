import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet("/edit")
public class startPage extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
String width = req.getParameter("width");
String height = req.getParameter("height");
        Cookie heightCookie = new Cookie("height", height);
        Cookie widthCookie = new Cookie("width", width);
        heightCookie.setMaxAge(-1*1*1);
        widthCookie.setMaxAge(-1*1*1);
        resp.addCookie(heightCookie);
        resp.addCookie(widthCookie);
        req.getRequestDispatcher("/edit.html").forward(req, resp);
    }
}
