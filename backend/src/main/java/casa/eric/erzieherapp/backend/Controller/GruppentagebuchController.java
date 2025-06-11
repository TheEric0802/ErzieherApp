package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.TagebuchEintrag;
import casa.eric.erzieherapp.backend.model.TagebuchEintragDTO;
import casa.eric.erzieherapp.backend.service.GruppentagebuchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/gruppentagebuch")
@AllArgsConstructor
public class GruppentagebuchController {

    private final GruppentagebuchService gruppentagebuchService;

    @GetMapping
    public List<TagebuchEintrag> getAllTagebuchEintraege() {
        return gruppentagebuchService.getAllTagebuchEintraege();
    }

    @GetMapping("/{gruppeId}/{datum}")
    public TagebuchEintrag getTagebuchEintragByGruppeAndDatum(@PathVariable String gruppeId, @PathVariable LocalDate datum) {
        return gruppentagebuchService.getTagebuchEintragByGruppeAndDatum(gruppeId, datum);
    }

    @GetMapping("/{gruppeId}")
    public List<TagebuchEintrag> getTagebuchEintraegeByGruppeId(@PathVariable String gruppeId) {
        return gruppentagebuchService.getTagebuchEintraegeByGruppeId(gruppeId);
    }

    @PostMapping
    public TagebuchEintrag createTagebuchEintrag(@RequestBody TagebuchEintragDTO tagebuchEintrag) {
        return gruppentagebuchService.createTagebuchEintrag(tagebuchEintrag);
    }
}
