package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Kind;
import casa.eric.erzieherapp.backend.model.KindDTO;
import casa.eric.erzieherapp.backend.service.KindService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kind")
@AllArgsConstructor
public class KindKontroller {

    private final KindService kindService;

    @GetMapping
    public List<Kind> getAllKinder() {
        return kindService.getAllKinder();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Kind createKind(@RequestBody KindDTO kind) {
        return kindService.createKind(kind);
    }
}
