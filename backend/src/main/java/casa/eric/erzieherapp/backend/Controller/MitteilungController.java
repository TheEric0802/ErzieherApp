package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.service.MitteilungService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mitteilung")
@AllArgsConstructor
public class MitteilungController {

    private final MitteilungService mitteilungService;

    @GetMapping
    public List<Mitteilung> getAllMitteilungen() {
        return mitteilungService.getAllMitteilungen();
    }
}
