

const router = Router();

router.post("/", crearProducto);
router.delete("/:id", borrarProductoPorId);

export default router;

