import { LoaderCircleIcon, TrashIcon, XIcon } from "lucide-react";

import { Link } from "@tanstack/react-router";

import {
  ProductSchema,
  ProductSchemaInput,
  productSchema,
} from "../products.schema";

import { AdminPageWrapper } from "@/components/admin-page-wrapper";
import {
  FileIcon,
  FileList,
  FileName,
  FileUpload,
  FileUploader,
  UploadedFile,
  useFileUploader,
} from "@/components/file-upload";
import { FormNavigationBlocker } from "@/components/form-navigation-blocker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppForm, useFormContext } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputWithStartIcon } from "@/components/ui/input-with-start-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ProductForm(props: {
  id?: number;
  categories: { id: number; name: string }[];
  images?: UploadedFile[];
  defaultValues?: ProductSchema;
}) {
  const form = useAppForm({
    defaultValues:
      props.defaultValues ||
      ({
        name: "",
        slug: "",
        description: "",
        images: [],
        price: "",
        unit: "",
        status: "draft",
        categoryId: null,
      } as ProductSchemaInput),
    validators: {
      onChange: productSchema,
    },
  });

  const pageTitle = props.id
    ? `Edit ${props.defaultValues?.name} Product`
    : "Add New Product";

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FormNavigationBlocker />
        <AdminPageWrapper
          breadcrumbs={[{ label: "All Products", href: "/admin/products" }]}
          pageTitle={pageTitle}
          rightSideContent={<ActionButtons isEditing={!!props.id} />}
        >
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card className="container px-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Add a new product by entering suitable name, slug,
                      description, category, price, and so on.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <form.AppField
                      name="name"
                      children={(field) => (
                        <field.FormItem>
                          <field.FormLabel className="gap-1">
                            Name <span className="text-destructive">*</span>
                          </field.FormLabel>
                          <field.FormControl>
                            <Input
                              type="text"
                              placeholder="Carrot"
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              inputMode="numeric"
                            />
                          </field.FormControl>
                          <field.FormMessage />
                          <field.FormDescription>
                            Enter a suitable name for the product.
                          </field.FormDescription>
                        </field.FormItem>
                      )}
                    />
                    <form.AppField
                      name="slug"
                      children={(field) => (
                        <field.FormItem>
                          <field.FormLabel className="gap-1">
                            Slug <span className="text-destructive">*</span>
                          </field.FormLabel>
                          <field.FormControl>
                            <Input
                              type="text"
                              placeholder="carrot"
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </field.FormControl>
                          <field.FormMessage />
                          <field.FormDescription>
                            This will be used in URL of the product.
                          </field.FormDescription>
                        </field.FormItem>
                      )}
                    />
                    <div className="grid items-start gap-4 lg:grid-cols-2">
                      <form.AppField
                        name="price"
                        children={(field) => (
                          <field.FormItem>
                            <field.FormLabel className="gap-1">
                              Price <span className="text-destructive">*</span>
                            </field.FormLabel>
                            <field.FormControl>
                              <InputWithStartIcon
                                type="text"
                                placeholder="199"
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                  field.handleChange(e.target.value);
                                }}
                              >
                                Rs.
                              </InputWithStartIcon>
                            </field.FormControl>
                            <field.FormMessage />
                          </field.FormItem>
                        )}
                      />
                      <form.AppField
                        name="unit"
                        children={(field) => (
                          <field.FormItem>
                            <field.FormLabel>Unit</field.FormLabel>
                            <field.FormControl>
                              <Input
                                type="text"
                                placeholder="kg"
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                  field.handleChange(e.target.value);
                                }}
                              />
                            </field.FormControl>
                            <field.FormMessage />
                            <field.FormDescription>
                              Example: kg, ltr, ml, etc.
                            </field.FormDescription>
                          </field.FormItem>
                        )}
                      />
                      <form.AppField
                        name="salePrice"
                        children={(field) => (
                          <field.FormItem className="col-span-full">
                            <field.FormLabel>Sale Price</field.FormLabel>
                            <field.FormControl>
                              <InputWithStartIcon
                                type="text"
                                placeholder="150"
                                name={field.name}
                                value={field.state.value?.toString()}
                                onBlur={field.handleBlur}
                                onChange={(e) => {
                                  field.handleChange(e.target.value);
                                }}
                              >
                                Rs.
                              </InputWithStartIcon>
                            </field.FormControl>
                            <field.FormMessage />
                            <field.FormDescription>
                              (Optional) Discounted price for the product.
                            </field.FormDescription>
                          </field.FormItem>
                        )}
                      />
                    </div>
                    <form.AppField
                      name="description"
                      children={(field) => (
                        <field.FormItem>
                          <field.FormLabel>Description</field.FormLabel>
                          <field.FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Freshy prepared organic…"
                              name={field.name}
                              value={field.state.value?.toString()}
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                field.handleChange(e.target.value);
                              }}
                            />
                          </field.FormControl>
                          <field.FormMessage />
                        </field.FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form.AppField
                      name="images"
                      children={(field) => (
                        <field.FormItem>
                          <field.FormControl>
                            <FileUploader
                              maxFilesCount={20}
                              maxFileSize="1gb"
                              accept={["image/*"]}
                              onChange={(files) =>
                                field.handleChange(files.map((f) => f.id))
                              }
                              initialFiles={props.images}
                            >
                              <FileUpload />
                              <UploadingFilesList />
                              <UploadedFilesList />
                            </FileUploader>
                          </field.FormControl>
                          <field.FormMessage />
                        </field.FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form.AppField
                      name="status"
                      children={(field) => (
                        <field.FormItem>
                          <field.FormLabel>Status</field.FormLabel>

                          <Select
                            value={field.state.value}
                            onValueChange={(v) =>
                              field.handleChange(
                                v as "draft" | "archived" | "published",
                              )
                            }
                          >
                            <field.FormControl>
                              <SelectTrigger
                                aria-label="Select a status"
                                className="w-full"
                              >
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </field.FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                              <SelectItem value="published">
                                Published
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <field.FormMessage />
                        </field.FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form.AppField
                      name="categoryId"
                      children={(field) => (
                        <field.FormItem>
                          <field.FormLabel>Category</field.FormLabel>

                          <Select
                            value={String(field.state.value)}
                            onValueChange={(v) => (v === "null" ? null : +v)}
                          >
                            <field.FormControl>
                              <SelectTrigger
                                aria-label="Select a category"
                                className="w-full"
                              >
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </field.FormControl>
                            <SelectContent>
                              <SelectItem value="null">None</SelectItem>
                              {props.categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={String(category.id)}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <field.FormMessage />
                        </field.FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </AdminPageWrapper>
      </form>
    </form.AppForm>
  );
}

function ActionButtons({ isEditing }: { isEditing?: boolean }) {
  const {
    state: { isSubmitting },
  } = useFormContext();

  return (
    <>
      <Button variant="outline" size="sm" type="button" asChild>
        <Link to="/admin/products">Discard</Link>
      </Button>
      <Button size="sm" type="submit" disabled={isSubmitting}>
        {isSubmitting && <LoaderCircleIcon className="animate-spin" />}
        <span>{isEditing ? "Update" : "Add"} Product</span>
      </Button>
    </>
  );
}

function UploadingFilesList() {
  const { uploadingFiles, cancelUpload } = useFileUploader();

  if (uploadingFiles.length === 0) return null;

  return (
    <div className="mt-4">
      <p>Uploading files</p>
      <div className="mt-2 space-y-2">
        {uploadingFiles.map(({ file, preview, progress }) => (
          <FileList key={file.name}>
            <FileIcon fileType={file.type} name={file.name} preview={preview} />

            <FileName name={file.name} progress={progress} />
            <Button
              onClick={() => cancelUpload(file)}
              size="icon"
              variant="destructive"
              type="button"
              className="justify-self-end"
            >
              <XIcon />
            </Button>
          </FileList>
        ))}
      </div>
    </div>
  );
}

function UploadedFilesList() {
  const { uploadedFiles, deleteFile } = useFileUploader();

  if (uploadedFiles.length === 0) return null;

  return (
    <div className="mt-4">
      <p>Uploaded files</p>
      <div className="mt-2 space-y-2">
        {uploadedFiles.map(({ name, url, fileType, id }) => (
          <FileList key={id} className="flex-grow">
            <FileIcon fileType={fileType} name={name} preview={url} />

            <FileName name={name} />
            <Button
              onClick={() => deleteFile(url)}
              size="icon"
              variant="destructive"
              type="button"
              className="justify-self-end"
            >
              <TrashIcon />
            </Button>
          </FileList>
        ))}
      </div>
    </div>
  );
}
