package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.GruppeDTO;
import casa.eric.erzieherapp.backend.service.GruppeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gruppe")
@AllArgsConstructor
public class GruppeController {

    private final GruppeService gruppeService;

    @GetMapping
    public List<Gruppe> getAllGruppen() {
        return gruppeService.getAllGruppen();
    }

    @GetMapping("/{id}")
    public Gruppe getGruppeById(@PathVariable String id) {
        return gruppeService.getGruppeById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Gruppe createGruppe(@RequestBody GruppeDTO gruppe) {
        return gruppeService.createGruppe(gruppe);
    }

    @PutMapping("/{id}")
    public Gruppe updateGruppe(@PathVariable String id, @RequestBody GruppeDTO gruppe) {
        return gruppeService.updateGruppe(id, gruppe);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteGruppe(@PathVariable String id) {
        gruppeService.deleteGruppe(id);
    }
}
