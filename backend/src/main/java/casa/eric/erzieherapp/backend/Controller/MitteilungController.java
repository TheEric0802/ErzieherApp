package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Mitteilung;
import casa.eric.erzieherapp.backend.model.MitteilungDTO;
import casa.eric.erzieherapp.backend.service.MitteilungService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Mitteilung createMitteilung(@RequestBody MitteilungDTO mitteilung) {
        return mitteilungService.createMitteilung(mitteilung);
    }

    @PutMapping("/{id}")
    public Mitteilung updateMitteilung(@PathVariable String id, @RequestBody MitteilungDTO mitteilung) {
        return mitteilungService.updateMitteilung(id, mitteilung);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteMitteilung(@PathVariable String id) {
        mitteilungService.deleteMitteilung(id);
    }
}
