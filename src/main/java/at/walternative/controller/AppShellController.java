package at.walternative.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Controller
public class AppShellController {

    @RequestMapping("/")
    public String getAppShell(Model model) {

        StringBuilder builder = new StringBuilder();

        Resource appShellStyleFile = new ClassPathResource("/static/dist/css/main.css");
        try (BufferedReader reader =
                     new BufferedReader(new InputStreamReader(
                             new BufferedInputStream(appShellStyleFile.getInputStream())))) {
            reader.lines()
                    .forEach(builder::append);
        } catch (IOException e) {
            e.printStackTrace();
        }

        model.addAttribute("foo", "Hello Handlebars");
        model.addAttribute("appShellStyles", builder);
        return "app-shell";
    }
}
